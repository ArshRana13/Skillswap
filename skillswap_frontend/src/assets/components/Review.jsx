import { motion } from "framer-motion";

function Review(props) {
    return (
        
            <div className="bg-black  text-left  h-fit border-none rounded-lg w-full m-2">

                <div className=" h-16 flex items-center p-2 border-b-2 border-gray-500 gap-2">
                    <div className="h-12 w-12 border-none rounded-full ">
                        <img src={props.giver.profileImageUrl} className=" h-12 w-12 border-none rounded-full" alt="" />
                    </div>
                    <div className="text-gray-50 text-2xl font-semibold">{props.giver.name}</div>
                </div>
                <div className="text-gray-100 p-2">
                    {props.content}
                </div>


            </div>

    )

}

export default Review;