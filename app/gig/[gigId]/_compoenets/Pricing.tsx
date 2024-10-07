"use client";
import React, { useEffect, useState } from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { getGigsById } from "@/actions/get-gigs-byid";
import { auth } from "@/auth";
import { any, set } from "zod";
import { getLoggedUser } from "@/actions/get-logged-user";
import { createOrder } from "@/actions/create-order";
import { existingOrder } from "@/actions/existingorder";
import toast from "react-hot-toast";

interface PricingProps {
  gigData: Awaited<ReturnType<typeof getGigsById>>;
  userInfo: Awaited<ReturnType<typeof getLoggedUser>>;
}

function Pricing({ gigData, userInfo }: PricingProps) {
  const router = useRouter();

  const [ishasOrdered, setIshasOrdered] = useState(false);

  useEffect(() => {
    const checkOrder = async () => {
      const hasOrdered = await existingOrder(gigData!.id);
      setIshasOrdered(hasOrdered);
    };
    checkOrder();
  }, [gigData]);

  const handelOrder = async () => {
    if (ishasOrdered) return;
    await createOrder(gigData!.id);
    toast.success("Order Placed Successfully");
    setIshasOrdered(true);
     router.push("/buyer/orders");
  };

  // i want to be userinfo de type any

  return (
    <>
      {gigData && (
        <div className="sticky top-36 mb-10 h-max w-80">
          <div className="border p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <h4 className="text-md font-normal text-[#74767e]">
                {gigData.shortDesc}
              </h4>
              <h6 className="font-medium text-lg">{gigData.price}(tnd)</h6>
            </div>
            <div>
              <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                <div className="flex items-center gap-2">
                  <FiClock className="text-xl" />
                  <span>{gigData.deliveryTime} Days Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiRefreshCcw className="text-xl" />
                  <span>{gigData.revisions} Revisions</span>
                </div>
              </div>
              <ul></ul>
            </div>
            <ul className="flex gap-1 flex-col">
              {/* @ts-ignore */}
              {gigData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <BsCheckLg className="text-[#599bff] text-lg" />
                  <span className="text-[#4f5156]">{feature}</span>
                </li>
              ))}
            </ul>
            {gigData.userId === userInfo!.id ? (
              <button
                className="flex items-center bg-[#599bff] text-white py-2 justify-center font-bold text-lg relative rounded"
                onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
              >
                <span>Edit</span>
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            ) : (
              <button
                className="flex items-center bg-[#599bff] text-white py-2 justify-center font-bold text-lg relative rounded"
                onClick={handelOrder}
                disabled={ishasOrdered}
              >
                {ishasOrdered ? <span>Ordered</span> : <span>Order Now</span>}
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            )}
          </div>
          {gigData.userId !== userInfo!.id && (
            <div className="flex items-center justify-center mt-5"></div>
          )}
        </div>
      )}
    </>
  );
}

export default Pricing;
