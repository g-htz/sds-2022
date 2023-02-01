interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Page({ title, children }: Props) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 pb-6 sm:px-0">{children}</div>
        </div>
      </main>
    </>
  );
}
