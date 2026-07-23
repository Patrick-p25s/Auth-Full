import { LoginForm } from "../features/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
