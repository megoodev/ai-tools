import SideBar from "./_components/SideBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (



<main className="flex gap-5">
      <SideBar/>
      {children}

    </main>




  );
}