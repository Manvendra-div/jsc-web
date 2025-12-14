import CodeBox from "@/components/codebox";
import Console from "@/components/console";
import NavBar from "@/components/navbar";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black relative">
        <NavBar />
        <div className="px-10 w-full flex flex-col h-[98dvh] max-h-[1400px] pb-10 gap-4">
          <CodeBox />
          <Console />
        </div>
      </main>
    </div>
  );
}
