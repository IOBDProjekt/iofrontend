import React from "react";
import EmailForm from "../assets/EmailForm/EmailForm";
import { useSearchParams } from "react-router-dom";

import ResetPasswordForm from "../assets/ResetPassword/ResetPasswordForm";
import "../assets/ResetPassword/ResetPassword.css";
import "../assets/EmailForm/EmailForm.css";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get("token");

    return (
        <div className="reset-password-wrapper">
            {resetToken ? (
                <ResetPasswordForm resetToken={resetToken} />
            ) : (
                <EmailForm
                    submitLink={"/auth/forgot-password"}
                    formTitle={"Przywracanie dostępu"}
                    buttonText={"Wyślij"}
                />
            )}
        </div>
    );
}
