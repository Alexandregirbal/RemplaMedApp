export default function Footer() {
    return (
        <footer className="flex h-6 w-full justify-center bg-background">
            <p className="text-sm text-gray-700">
                {`© ${new Date().getFullYear()} RemplaMed`}
            </p>
        </footer>
    );
}
