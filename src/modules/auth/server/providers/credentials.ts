import Credentials from "next-auth/providers/credentials";

const credentialsProvider = Credentials({
    id: "credentials_provider",
    name: "Credentials",
    type: "credentials",
    credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
    },
    authorize: (credentials) => {
        console.log(credentials);
        const user = {
            id: "12345",
            name: "John Smith",
            email: "john.smith@gmail.com",
        };
        if (!user) {
            return null;
        }
        return user;
    },
});

export default credentialsProvider;
