import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Welcome back</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Log in</h1>
        <div className="mt-8 space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Continue</Button>
          <Button className="w-full" variant="secondary">
            Continue with Google
          </Button>
        </div>
      </Card>
    </main>
  );
}
