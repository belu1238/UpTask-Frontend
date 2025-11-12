
export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return ( 
        <p className="bg-red-600 text-white my-4 p-3 text-center
        uppercase text-sm font-bold">{children}</p>
    );
}
