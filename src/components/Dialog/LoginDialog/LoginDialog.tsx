import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../../../services/userService";
import "./LoginDialog.scss";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const LoginDialog = ({ open, onClose, onSuccess }: LoginDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message;

      setError(
        (typeof message === "string" && message) ||
          "Đăng nhập thất bại. Thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-dialog__backdrop" onClick={onClose}>
      <div
        className="login-dialog"
        onClick={(e) => e.stopPropagation()}>
        <div className="login-dialog__header">
          <h3>Đăng nhập</h3>
          <button className="login-dialog__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="login-dialog__form" onSubmit={handleSubmit}>
          <label className="login-dialog__label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="login-dialog__label">
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <div className="login-dialog__error">{error}</div>}

          <button
            type="submit"
            className="login-dialog__submit"
            disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <button type="button" className="login-dialog__register">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;

