import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";

export default function Landing() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    // Redirect to Replit Auth
    window.location.href = '/api/login';
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    // Redirect to Replit Auth for signup
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">TriAdd</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {currentScreen === 'login' ? (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">Faça login na sua conta</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ou{" "}
                <button
                  onClick={() => setCurrentScreen('signup')}
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                  data-testid="button-show-signup"
                >
                  crie uma nova conta
                </button>
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleLogin} className="space-y-6" data-testid="form-login">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Endereço de email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Digite seu email"
                    data-testid="input-login-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Digite sua senha"
                      data-testid="input-login-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" name="remember" data-testid="checkbox-remember" />
                    <Label htmlFor="remember-me" className="text-sm text-muted-foreground">
                      Lembrar de mim
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                    data-testid="link-forgot-password"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>

                <Button type="submit" className="w-full" data-testid="button-login">
                  <User className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Ou continue com</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = '/api/login'}
                    data-testid="button-google-login"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = '/api/login'}
                    data-testid="button-github-login"
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">Crie sua conta</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <button
                  onClick={() => setCurrentScreen('login')}
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                  data-testid="button-show-login"
                >
                  Faça login aqui
                </button>
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSignup} className="space-y-6" data-testid="form-signup">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nome</Label>
                    <Input
                      id="first-name"
                      name="first_name"
                      type="text"
                      required
                      placeholder="João"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Sobrenome</Label>
                    <Input
                      id="last-name"
                      name="last_name"
                      type="text"
                      required
                      placeholder="Silva"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Endereço de email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    placeholder="joao.silva@exemplo.com"
                    data-testid="input-signup-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Crie uma senha forte"
                      data-testid="input-signup-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid="button-toggle-signup-password"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A senha deve ter pelo menos 8 caracteres com maiúsculas, minúsculas e números.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Confirme sua senha"
                      data-testid="input-confirm-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      data-testid="button-toggle-confirm-password"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" name="terms" required data-testid="checkbox-terms" />
                  <Label htmlFor="terms" className="text-sm">
                    Eu aceito os{" "}
                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                      Termos de Serviço
                    </button>{" "}
                    e a{" "}
                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                      Política de Privacidade
                    </button>
                  </Label>
                </div>

                <Button type="submit" className="w-full" data-testid="button-signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar conta
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Shield className="text-primary-foreground w-3 h-3" />
              </div>
              <span className="text-sm text-muted-foreground">© 2024 TriAdd. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Política de Privacidade</button>
              <button className="hover:text-foreground transition-colors">Termos de Serviço</button>
              <button className="hover:text-foreground transition-colors">Suporte</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
