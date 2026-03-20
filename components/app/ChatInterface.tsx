import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { Message } from "@/types";

export function ChatInterface({ messages }: { messages: Message[] }) {
  return (
    <Card className="rounded-[30px] p-0">
      <div className="border-b border-cream-300 px-6 py-5">
        <h3 className="font-serif text-3xl text-brown-800">Project chat</h3>
      </div>
      <div className="space-y-4 px-6 py-6">
        {messages.map((message) => (
          <div key={message.id} className="max-w-xl rounded-[24px] bg-cream-50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-brown-700">{message.senderName}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-brown-400">{message.createdAt}</p>
            </div>
            <p className="mt-2 text-brown-500">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-cream-300 px-6 py-5">
        <Input placeholder="Message your pro..." />
      </div>
    </Card>
  );
}
