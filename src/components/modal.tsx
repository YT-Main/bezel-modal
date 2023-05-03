{/* 
    Modal that displays order offer
*/}
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect, use } from "react";
import { useRouter } from 'next/router'
import {getOrder, acceptOffer, declineOffer} from '@/scripts/interface'
import { list } from 'postcss';
import axios from "axios"

interface Props {
    isvisable?: boolean
    onClose?: any
}

const Modal = ({ isvisable, onClose }: Props) => {
    if ( !isvisable ) return null;

    const [listing, setListing] = useState<any>();
    const {current: updated} = useRef(10)
    
    // Close modal
    const handleClose = (e: any) => {
        if( e.target.id === 'closer') onClose()
    }

    // Pull data using interface
    const pullListing = async() =>{
        var order = await getOrder()
        await setListing(order)
    }

    //Convert Number to Currencey
    let Dollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Get Listing from api
    useEffect (() => {
        pullListing()
        
    }, [updated])

    if(listing){
        return (
            <>
                <main>
                    <div onClick={handleClose} id="closer" className='fixed z-20 inset-0 bg-black bg-opacity-70 flex justify-center items-center'>
                        
                        <div className="mx-auto rounded-xl" style={{background: "#fffcf8", borderRadius: "30px"}}>
                            {/* Close out modal */}
                            <div className='relative'>
                                <button onClick={handleClose} className='text-xl p-4 absolute right-0' id="closer">
                                    <svg onClick={handleClose} id="closer" fill="none" width={30} height={30} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className='lg:flex'>
                                <div className='py-4 lg:py-28 px-16'>
                                    {/* Interactove area (to accept or reject offer) */}
                                    <h3 className='font-medium' style={{color: "#899893"}}>CONGRATS!</h3>
                                    <h1 className='ly-4 lg:py-8 lg:text-4xl font-medium' style={{color: "#365249"}}>Your Watch Is Sold!</h1>
                                    <p style={{color: "#899893"}}>You have 1 business day to accept the sale.</p>
                                    <p style={{color: "#899893"}}>If you do not accept, it will automatically be rejected.</p>
                                    <div className='align-bottom pt-8'>
                                        <button onClick={acceptOffer} className='w-full font-semibold rounded-full text-center py-1 lg:py-4 text-white' style={{background: "#1a3a32"}}>Accept sale</button>
                                    </div>
                                    <div className='align-bottom pt-8'>
                                        <button onClick={declineOffer} className='w-full font-semibold rounded-full text-center py-1 lg:py-4'style={{color: "#1a3a32"}}>Reject sale</button>
                                    </div>
                                </div>
                                <div className='p-10'>
                                    <div className='rounded-xl px-8 py-4 lg:py-12 lg:w-[450px]' style={{background: "#f6f4f0", borderRadius: "30px"}}>
                                        <hr className=" rounded h-0.5 w-full my-3" style={{background: "#dbdad7"}}/>
                                        {/* Main Listing */}
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className='text-xl' style={{color: "#1a3a32"}}>{listing.listing.model.name}</h2>
                                                <p className='pt-2' style={{color: "#899893"}}>{listing.listing.condition} / {listing.listing.manufactureYear}</p>
                                            </div>
                                            <div>
                                                <Image src={listing.listing.images[0].image.url} alt='' width={100} height={100} className='rounded-lg object-cover' />
                                            </div>
                                        </div>
                                        <hr className=" rounded h-0.5 w-full my-3" style={{background: "#dbdad7"}}/>

                                        {/* Price Breakdown section */}

                                        <div >
                                            <div className='flex justify-between w-full py-1' style={{color: "#899893"}}>
                                                <p>Selling Price</p>
                                                <p>{Dollar.format(listing.salePriceCents / 100)}</p>
                                            </div>
                                            <div className='flex justify-between w-full py-1' style={{color: "#899893"}}>
                                                <p>Level 1 Commision ({listing.commissionRateBips / 100}%)</p>
                                                <p>{Dollar.format((listing.salePriceCents / 100) * (listing.commissionRateBips / 10000))}</p>
                                            </div>
                                            <div className='flex justify-between w-full py-1' style={{color: "#899893"}}>
                                                <p>Seller Fees</p>
                                                <p>{Dollar.format(listing.sellerFeeCents / 100)}</p>
                                            </div>
                                            <div className='flex justify-between w-full py-1' style={{color: "#899893"}}>
                                                <p>Insured Shipping</p>
                                                <p>Free</p>
                                            </div>
                                            <div className='flex justify-between w-full' style={{color: "#2b8570"}}>
                                                <p>Bezel authentication</p>
                                                <p>Free</p>
                                            </div>
                                        </div>

                                        <hr className="rounded h-0.5 w-full mb-3 mt-8" style={{background: "#dbdad7"}}/>

                                        {/*Final Total*/}
                                        <div>
                                            <div className='flex justify-between w-full font-semibold py-1' style={{color: "#1a3a32"}}>
                                                <p>Earnings</p>
                                                <p>{Dollar.format(listing.payoutAmountCents / 100)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}

export default Modal;


