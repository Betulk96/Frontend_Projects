import DOMPurify from "dompurify";
import { marked } from "marked";
import katex from "katex";

export const chatMarker = (text) => {
	const response = text?.response || "";
	
	// Daha kapsamlı bir regex kullanarak matematik ifadelerini yakala
	const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\\begin\{[^}]+\}[\s\S]+?\\end\{[^}]+\})/g;
	
	const processedText = response.replace(mathRegex, (match) => {
		// Başlangıç ve bitiş işaretlerini temizle
		const formula = match.replace(/^\$\$|\$\$$/g, '')
							 .replace(/^\$|\$$/g, '')
							 .replace(/^\\\[|\\\]$/g, '')
							 .replace(/^\\\(|\\\)$/g, '')
							 .replace(/\\begin\{[^}]+\}|\\end\{[^}]+\}/g, '');
		try {
			return katex.renderToString(formula, {
				displayMode: match.startsWith('$$') || match.startsWith('\\[') || match.startsWith('\\begin'),
				throwOnError: false,
				output: 'mathml',
				macros: {
					"\\f": "f(#1)"
				}
			});
		} catch (error) {
			console.error("KaTeX rendering error:", error);
			return match; // Hata durumunda orijinal metni koru
		}
	});

	return DOMPurify.sanitize(marked(processedText));
}
