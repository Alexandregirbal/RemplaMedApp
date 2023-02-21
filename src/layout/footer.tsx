export default function Footer() {
    return (
        <footer className="fixed bottom-0 z-10 flex w-full justify-center bg-background">
            <span className="text-sm text-gray-700">
                {`© ${new Date().getFullYear()} RemplaMed`}
            </span>
        </footer>
    );
}
