{/*
    Interface with API to send and receive infromation

    Given api specs this could also be modified to work dynamically!
*/}


import axios from "axios"

// Get order information
export async function getOrder(){
    var val =""
    const headers = {
    }
    await axios.get('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123',{headers: headers})
        .then(function(response) {
            val = response.data
            return response.data
        })
        .catch(function (error) {
            console.log(error)
            alert(error)
        })

    return val
}


 // Accept Offer
 export const acceptOffer = async() =>{
    axios.post('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/accept',{},{})
        .then(function(response) {
            console.log(response.data)
            alert('Offer Accepted!')
        })
        .catch(function (error) {
            console.log(error)
            alert('There was an error accepting the offer. Please try again later!')
        })
}

// Decline Offer
export const declineOffer = async() =>{
    axios.post('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/decline"',{},{})
        .then(function(response) {
            console.log(response.data)
            alert('Offer Declined!')
        })
        .catch(function (error) {
            console.log(error)
            alert('There was an error declining the offer. Please try again later!')
            
        })
}

