import Image from "next/image"
type UserIconProps = {
    image: string;
}

const UserIcon = ({image}: UserIconProps) => {
    return (
        <Image
            width={64}
            height={64}
            className="w-14 rounded-full"
            src={image}
            alt="profile-picture"
            priority
            />
    )
}

export default UserIcon