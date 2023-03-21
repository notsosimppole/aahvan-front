import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = [
    <div className="item" data-value="1">
        <div className="flex justify-center mr-28 font-inter text-white">Badminton</div>
        <img src="static/images/badminton.svg" className="w-[300px]" />
        <div className="flex justify-center mr-28 font-inter text-white">🏆Prize - 20000k</div>
    </div>,
    <div className="item" data-value="2">
        <div className="flex justify-center mr-28 font-inter text-white">Cricket</div>
        <img src="static/images/cricket.svg" className="w-[300px]" />
        <div className="flex justify-center mr-28 font-inter text-white">🏆Prize - 20000k</div>
    </div>,
    <div className="item" data-value="3">
        <div className="flex justify-center mr-28 font-inter text-white">Football</div>
        <img src="static/images/football.svg" className="w-[300px]" />
        <div className="flex justify-center mr-28 font-inter text-white">🏆Prize - 20000k</div>
    </div>,
    <div className="item" data-value="4">
        <div className="flex justify-center mr-28 font-inter text-white">Badminton</div>
        <img src="static/images/badminton.svg" className="w-[300px]" />
        <div className="flex justify-center mr-28 font-inter text-white">🏆Prize - 20000k</div>
    </div>,
    <div className="item" data-value="5">
        <div className="flex justify-center mr-28 font-inter text-white">Cricket</div>
        <img src="static/images/cricket.svg" className="w-[300px]" />
        <div className="flex justify-center mr-28 font-inter text-white">🏆Prize - 20000k</div>
    </div>,
];

export default function Carousel_home() {

    return (
        <div>
            <AliceCarousel className="text-[40px]"
                mouseTracking
                items={items}
                paddingLeft={50}
                paddingRight={50}
                responsive={responsive}
                infinite={true}
            />
        </div>
    );

}



// export default class Carousel extends Component() {
//     render() {
//         const settings = {
//             dots: true,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 1,
//             slidesToScroll: 1
//         };
//         return (
//             <div>
//                 <h2> Single Item</h2>
//                 <Slider {...settings}>
//                     <div>
//                         <h3>1</h3>
//                     </div>
//                     <div>
//                         <h3>2</h3>
//                     </div>
//                     <div>
//                         <h3>3</h3>
//                     </div>
//                     <div>
//                         <h3>4</h3>
//                     </div>
//                     <div>
//                         <h3>5</h3>
//                     </div>
//                     <div>
//                         <h3>6</h3>
//                     </div>
//                 </Slider>
//             </div>
//         )
//     }
// }