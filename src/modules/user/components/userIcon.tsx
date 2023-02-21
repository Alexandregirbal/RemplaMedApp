import Image from "next/image";
type UserIconProps = {
    image: string;
    size: number;
};

/**
 *
 * @prop image the url of the image to display
 * @prop size the size of the image in pixels
 * @returns a UserIcon component
 */
const UserIcon = ({ image, size }: UserIconProps) => {
    return (
        <Image
            width={size}
            height={size}
            className="w-14 rounded-full"
            src={image}
            alt="profile-picture"
            priority
        />
    );
};

export default UserIcon;
