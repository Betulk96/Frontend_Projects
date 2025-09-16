"use client";

import { registerAction } from "@/actions/auth-action";
import { getUserInputsAction } from "@/actions/user-input-actions";
import { swalAlert } from "@/helpers/alert/swal";
import { useUserInput } from "@/hook/useUserInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
    const { formData, handleChange, resetForm } = useUserInput();

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repassword) {
            alert("Passwords do not match!");
            return;
        }

        const payload = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            role: "patient",
        };

        const response = await registerAction(payload);
        console.log("response", response);

        if (!response.success) {
            alert(response.message || "An error occurred.");
            return;
        }

        swalAlert("Registration successful!", "success");


        setTimeout(() => {
            router.push(`/`);
        }, 1000);
    };

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl p-8 m-4 shadow-lg rounded-2xl bg-white bg-opacity-10 border border-white/30 backdrop-blur-md"
            >
                <h2 className="text-3xl  text-center text-gray-800 mb-6">
                    Register
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Username */}
                    <InputField
                        name="username"
                        label="Username"
                        value={formData.username || ""}
                        onChange={handleChange}
                        required
                    />
                    {/* Email */}
                    <InputField
                        name="email"
                        type="email"
                        label="Email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required
                    />

                    {/* Password */}
                    <InputField
                        name="password"
                        type="password"
                        label="Password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        required
                    />

                    {/* Repassword */}
                    <InputField
                        name="repassword"
                        type="password"
                        label="Repeat Password"
                        value={formData.repassword || ""}
                        onChange={handleChange}
                        required
                    />

                    {/* Age */}
                    <InputField
                        name="age"
                        type="number"
                        label="Age"
                        value={formData.age || ""}
                        onChange={handleChange}
                        required
                    />

                    {/* Gender */}
                    <SelectField
                        name="gender"
                        label="Gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                        options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },]}
                    />

                    {/* Weight */}
                    <InputField
                        name="weight"
                        type="number"
                        label="Weight (kg)"
                        value={formData.weight || ""}
                        onChange={handleChange}
                    />

                    {/* Height */}
                    <InputField
                        name="height"
                        type="number"
                        label="Height (cm)"
                        value={formData.height || ""}
                        onChange={handleChange}
                    />

                    {/* Activity Level */}
                    <SelectField
                        name="activity_level"
                        label="Activity Level"
                        value={formData.activity_level || ""}
                        onChange={handleChange}
                        options={[
                            { value: "sedentary", label: "Sedentary" },
                            { value: "light", label: "Lightly Active" },
                            { value: "moderate", label: "Moderately Active" },
                            { value: "very_active", label: "Very Active" },
                            { value: "extra_active", label: "Super Active" },
                        ]}
                    />


                    {/* Fitness Goal */}
                    <SelectField
                        name="fitness_goal"
                        label="Fitness Goal"
                        value={formData.fitness_goal || ""}
                        onChange={handleChange}
                        options={[
                            { value: "weight_loss", label: "Lose Weight" },
                            { value: "maintenance", label: "Maintain Weight" },
                            { value: "weight_gain", label: "Gain Weight" },


                        ]}
                    />


                    {/* Weight Change Goal */}
                    <InputField
                        name="weight_change_goal"
                        label="Weight Change Goal (kg)"
                        value={formData.weight_change_goal || ""}
                        onChange={handleChange}
                    />

                    {/* Pregnancy (only if Female) */}
                    {formData.gender === "Female" && (
                        <SelectField
                            name="pregnancy"
                            label="Pregnancy"
                            value={formData.pregnancy || ""}
                            onChange={handleChange}
                            options={["Yes", "No"]}
                        />
                    )}

                    {/* Breastfeeding (only if Female and Pregnant) */}
                    {formData.gender === "Female" && formData.pregnancy === "Yes" && (
                        <SelectField
                            name="breastfeeding"
                            label="Breastfeeding"
                            value={formData.breastfeeding || ""}
                            onChange={handleChange}
                            options={["Yes", "No"]}
                        />
                    )}

                    {/* Allergies */}
                    <InputField
                        name="allergies"
                        label="Allergies (comma-separated)"
                        value={formData.allergies || ""}
                        onChange={handleChange}
                    />

                    <InputField
                        name="cuisine_preference"
                        label="Cuisine Preference"
                        value={formData.cuisine_preference || ""}
                        onChange={handleChange}
                    />
                    {/* Nationality */}
                    <InputField
                        name="nationality"
                        label="Nationality"
                        value={formData.nationality || ""}
                        onChange={handleChange}
                    />

                    {/* Lifestyle */}
                    <InputField
                        name="lifestyle"
                        label="Lifestyle"
                        value={formData.lifestyle || ""}
                        onChange={handleChange}
                    />

                    {/* Regular Medications */}
                    <InputField
                        name="regular_medications"
                        label="Regular Medications"
                        value={formData.regular_medications || ""}
                        onChange={handleChange}
                    />

                    {/* Medical History */}
                    <InputField
                        name="medical_history"
                        label="Medical History"
                        value={formData.medical_history || ""}
                        onChange={handleChange}
                    />

                    {/* _pid 
                    <InputField
                        name="_pid"
                        label="PID"
                        value={formData._pid || ""}
                        onChange={handleChange}
                    />*/}

                    {/* _did 
                    <InputField
                        name="_did"
                        label="DID"
                        value={formData._did || ""}
                        onChange={handleChange}
                    />*/}

                    {/* Country */}
                    <SelectField
                        name="residing_country"
                        label="Residing Country"
                        value={formData.residing_country || ""}
                        onChange={handleChange}
                        options={[
                            { value: "Turkey", label: "Turkey" },
                            { value: "United States", label: "United States" },
                            { value: "United Kingdom", label: "United Kingdom" },
                            { value: "Germany", label: "Germany" },
                            { value: "France", label: "France" },
                            { value: "Italy", label: "Italy" },
                            { value: "Spain", label: "Spain" },
                            { value: "Netherlands", label: "Netherlands" },
                            { value: "Belgium", label: "Belgium" },
                            { value: "Switzerland", label: "Switzerland" },
                            { value: "Austria", label: "Austria" },
                            { value: "Denmark", label: "Denmark" },
                            { value: "Finland", label: "Finland" },
                            { value: "Sweden", label: "Sweden" },
                            { value: "Norway", label: "Norway" },
                            { value: "Ireland", label: "Ireland" },
                            { value: "Poland", label: "Poland" },
                            { value: "Czech Republic", label: "Czech Republic" },
                            { value: "Slovakia", label: "Slovakia" },
                            { value: "Hungary", label: "Hungary" },
                            { value: "Romania", label: "Romania" },
                            { value: "Bulgaria", label: "Bulgaria" },
                            { value: "Greece", label: "Greece" },
                            { value: "Portugal", label: "Portugal" },
                            { value: "Croatia", label: "Croatia" },
                            { value: "Slovenia", label: "Slovenia" },
                            { value: "Serbia", label: "Serbia" },
                            { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
                            { value: "Macedonia", label: "Macedonia" },
                            { value: "Albania", label: "Albania" },
                            { value: "Montenegro", label: "Montenegro" },
                            { value: "Kosovo", label: "Kosovo" },
                            { value: "Other", label: "Other" },]}

                    />
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 b text-white  py-3 rounded-xl hover:scale-105 transition-transform duration-500 bg-gradient-green-yellow hover:bg-gradient-dark-green "
                    >
                        Register
                    </button>
                </div>

                <div className="text-center text-sm text-color4 mt-4">
                    Already have an account?
                    <Link href="/">Sign in</Link>
                </div>
            </form>
        </div>
    );
}

function InputField({ name, label, type = "text", value, onChange, required }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={isPasswordField && showPassword ? "text" : type}
                id={name}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
            />

            {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-gray-600 hover:text-gray-900"
                >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
            )}
        </div>
    );
}

// Reusable select field
function SelectField({ name, label, value, onChange, options }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
            >
                <option value="">Select...</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
