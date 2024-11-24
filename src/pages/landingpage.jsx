import Navbar from "../components/Navbar";
import img from '../Assets/images/Background3.jpg'
import Hero from "../components/hero";
import Button from '@mui/joy/Button';
import DrawerAppBar from "../components/Navbarr"
import LandingPageBody from "../components/CategoryCard";
import Categories from "../components/Categories";
import PlanEvents from "../components/PlanEvents"
import LandingPageFooter from "../components/landingPageFooter";

const Landingpage = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <DrawerAppBar/>
            <Hero
                // image={img}
                // heading={"Your Events your Platform"}
                supportLineOne={"Elevate Your Career With Expert-Led Events"}
                supportLineTwo={"Find and attend industry-leading events designed to enhance your skills, network, and career."}
            />
            {/* <Button color="danger" sx={{width:"150px", margin: "40px"}}>Browse Events</Button> */}
            <Categories/>
            <PlanEvents/>
            <LandingPageFooter/>
        </div>


    );
}

export default Landingpage;