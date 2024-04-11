export const ClientFooterDetails = () => {
    return <div className="w-[60%] flex items-center justify-between text-white">
        <div className="flex gap-4 flex-col items-center justify-center">
            <h3 className="font-bold text-lg">
                Information
            </h3>
            <span>About us</span>
            <span>Contact us</span>
            <span>Location and working hours</span>
            <span>Our Guarantee</span>
        </div>

        <div className="flex gap-4 flex-col items-center justify-center">
            <h3 className="font-bold text-lg">
                Our Service
            </h3>
            <span>Return / exchange policy</span>
            <span>Extended Warranties</span>
            <span>Shipping options</span>
            <span>Payment Options</span>
        </div>

        <div className="flex gap-4 flex-col items-center justify-center">
            <h3 className="font-bold text-lg">
                Let us help you
            </h3>
            <span>Homepage</span>
            <span>Products</span>
            <span>Blogs</span>
            <span>Login</span>
        </div>
    </div>
}