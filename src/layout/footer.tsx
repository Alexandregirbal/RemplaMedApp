export default function Footer() {
    return (
        <footer className="flex h-6 w-full items-center justify-center bg-background">
            <p className="text-sm text-gray-500">
                {`© ${new Date().getFullYear()} RemplaMed`}
            </p>
        </footer>
    );
}
