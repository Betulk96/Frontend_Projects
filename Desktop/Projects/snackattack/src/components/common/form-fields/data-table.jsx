"use client";
import Link from "next/link";
import React, { useState } from "react";

export const Column = ({ children }) => {
	return <th scope="col">{children}</th>;
};

export const Row = ({ children, selectionMode, selected, onClick }) => {
	const isSelectable = selectionMode !== "none";

	return (
		<tr
			onClick={onClick}
			className={isSelectable && selected ? "table-primary" : ""}
			style={{ cursor: isSelectable ? "pointer" : "auto" }}
		>
			{children}
		</tr>
	);
};

export const Cell = ({ children }) => {
	return <td>{children}</td>;
};

export const FirstPageButton = ({ currentPage }) => {
	return (
		<li className="page-item">
			<Link
				className={`page-link ${currentPage ? "" : "disabled"}`}
				href="?page=0"
			>
				&laquo;
			</Link>
		</li>
	);
};

export const PreviousPageButton = ({ currentPage }) => {
	return (
		<li className="page-item">
			<a
				className={`page-link ${currentPage ? "" : "disabled"}`}
				href={`?page=${currentPage - 1}`}
			>
				&lsaquo;
			</a>
		</li>
	);
};

export const PageButton = ({ totalPages, currentPage }) => {
	const totalAmountOfButtons = 5;
	const averageOfTotalButtons = Math.floor(totalAmountOfButtons / 2);

	let startPage = Math.max(0, currentPage - averageOfTotalButtons);
	const endPage = Math.min(totalPages, startPage + totalAmountOfButtons);

	if (currentPage + averageOfTotalButtons >= totalPages) {
		startPage = Math.max(0, totalPages - totalAmountOfButtons);
	}

	return [...new Array(endPage - startPage)].map((_, index) => (
		<li className="page-item" key={index}>
			<Link
				className={`page-link ${
					index + startPage === currentPage ? "disabled" : ""
				}`}
				href={`?page=${startPage + index}`}
			>
				{startPage + index + 1}
			</Link>
		</li>
	));
};

export const NextPageButton = ({ currentPage, totalPages }) => {
	return (
		<li className="page-item">
			<a
				className={`page-link ${
					currentPage + 1 < totalPages ? "" : "disabled"
				}`}
				href={`?page=${currentPage + 1}`}
			>
				&rsaquo;
			</a>
		</li>
	);
};

export const LastPageButton = ({ currentPage, totalPages }) => {
	return (
		<li className="page-item">
			<a
				className={`page-link ${
					currentPage + 1 < totalPages ? "" : "disabled"
				}`}
				href={`?page=${totalPages - 1}`}
			>
				&raquo;
			</a>
		</li>
	);
};

export const Pagination = ({ totalPages, currentPage }) => {
	return (
		<nav aria-label="Navigation" className="d-flex justify-content-center ">
			<ul className="pagination">
				<FirstPageButton currentPage={currentPage} />
				<PreviousPageButton currentPage={currentPage} />
				<PageButton totalPages={totalPages} currentPage={currentPage} />
				<NextPageButton
					totalPages={totalPages}
					currentPage={currentPage}
				/>
				<LastPageButton
					totalPages={totalPages}
					currentPage={currentPage}
				/>
			</ul>
		</nav>
	);
};

const NoRecordFound = ({ colLength }) => {
	return (
		<tr>
			<td colSpan={colLength}>No records found</td>
		</tr>
	);
};

const selectionModeTypes = ["single", "multiple", "none"];

const DataTable = (props) => {
	const {
		name,
		title,
		dataSource,
		dataKey,
		children,
		error,
		selectionMode = "none", //single, multiple, none
		values,
		totalPages = 0,
		currentPage = 0,
		pageSize = 0,
	} = props;

	const [selectedItems, setSelectedItems] = useState(
		Array.isArray(values) ? [...values] : []
	);

	if (!name) throw new Error("Missing name for datatable");

	if (!dataSource || !Array.isArray(dataSource))
		throw new Error("dataSource attribute is required for datatable");

	if (!dataKey)
		throw new Error("dataKey attribute is required for datatable");

	if (!children) throw new Error("Column required for datatable");

	const columns = Array.isArray(children) ? [...children] : [children];

	if (!selectionModeTypes.includes(selectionMode))
		throw new Error("Invalid selection mode for datatable");

	if (selectionMode !== "none") {
		// Alltaki key="" uniqe key hatasini ortadan kaldirmak icin kullanildi
		columns.splice(
			0,
			0,
			<Column selectionMode={selectionMode} key=""></Column>
		);
	}

	const handleSelectedItems = (val) => {
		let arr = [...selectedItems];
		val = val.toString();

		if (!arr.includes(val)) {
			arr.push(val);
		} else {
			arr = arr.filter((item) => item !== val);
		}

		setSelectedItems(arr);
	};

	return (
		<>
			<div className={`card ${error ? "border-danger" : ""}`}>
				<input
					type="hidden"
					name={name}
					value={JSON.stringify(selectedItems)}
				/>
				<div className="card-body">
					<h3 className="card-title">{title}</h3>
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead>
								<tr>{columns}</tr>
							</thead>
							<tbody>
								{dataSource.length <= 0 ? (
									<NoRecordFound colLength={columns.length} />
								) : null}

								{dataSource.map((row, rowIndex) => {
									const id = row[dataKey];

									const selected = selectedItems.includes(
										id.toString()
									);

									return (
										<Row
											key={id}
											selectionMode={selectionMode}
											selected={selected}
											onClick={() =>
												handleSelectedItems(id)
											}
										>
											{columns.map((cell, colIndex) => {
												const {
													dataField,
													index,
													template,
													selectionMode,
												} = cell.props;

												let cellData = "";
												const cellKey = `${id}-${colIndex}`;

												if (index) {
													cellData =
														pageSize * currentPage +
														rowIndex +
														1;
												} else if (dataField) {
													cellData = row[dataField];
												} else if (template) {
													cellData = template(row);
												} else if (
													selectionMode !== "none"
												) {
													const inputType =
														selectionMode ===
														"single"
															? "radio"
															: "checkbox";
													cellData = (
														<input
															type={inputType}
															name="rd"
															className="form-check-input"
															value={id}
															onChange={(e) =>
																handleSelectedItems(
																	e.target
																		.value
																)
															}
															checked={selected}
														/>
													);
												}

												return (
													<Cell key={cellKey}>
														{cellData}
													</Cell>
												);
											})}
										</Row>
									);
								})}
							</tbody>
						</table>

						{totalPages > 1 ? (
							<Pagination
								totalPages={totalPages}
								currentPage={currentPage}
							/>
						) : null}
					</div>
				</div>
			</div>
			{error ? <div className="text-danger">{error}</div> : null}
		</>
	);
};

export default DataTable;
