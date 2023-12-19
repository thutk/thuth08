import { images } from '../assets/img';

export function Home() {
    return ( <
        div className = "home" >
        <
        img src = { images.background }
        className = "home-bgr"
        alt = "bgr" / >
        <
        h1 className = "home-title" > PHÒNG KHÁM ĐA KHOA CẨM ĐỨC < /h1> <
        h5 className = 'home-address' > 177 Liên Chiểu, Hòa Khánh < /h5> < /
        div >
    );
}