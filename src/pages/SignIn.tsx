
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check if we have an email from redirect
  useEffect(() => {
    const state = location.state as { email?: string };
    if (state?.email) {
      setEmail(state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Attempting to sign in with:", email);
      const result = await signIn(email, password);
      
      if (result.success) {
        navigate("/");
      } else if (result.error?.code === 'user_not_found') {
        // Redirect to signup if the user doesn't exist
        toast.info("Account not found. Redirecting to sign up page...");
        
        // Short delay to allow the toast to be seen
        setTimeout(() => {
          navigate("/signup", { 
            state: { email: email } // Pass the email to pre-fill in signup form
          });
        }, 1500);
      } else if (result.error?.code === 'invalid_credentials') {
        setErrorMessage("Invalid password. Please try again.");
      } else {
        setErrorMessage(result.error?.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-tulsi hover:text-tulsi-dark"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>

              {errorMessage && (
                <div className="rounded-md bg-red-50 p-2 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-tulsi hover:bg-tulsi-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-tulsi hover:text-tulsi-dark">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
