import React from "react";
import { NavLink } from 'react-router-dom';


export default function Footer() {
    return (

        <>
            <footer class="footer-distributed">

                <div class="footer-left">

                    <h3>DCX <span>CMS</span></h3>

                    <p class="footer-links">

                        <NavLink to="/dashboard">Home</NavLink>

                        <a href="#">Blog</a>

                        <a href="#">About</a>

                        <a href="#">Faq</a>

                        <a href="#">Contact</a>
                    </p>

                    <p class="footer-company-name">CMS Web © 2024</p>
                </div>

                <div class="footer-center">

                    <div>
                        <i class="fa fa-map-marker"></i>
                        <p><span>DTP TechPark</span> Banglore, India</p>
                    </div>

                    <div>
                        <i class="fa fa-phone"></i>
                        <p>+91.999.555.9999</p>
                    </div>

                    <div>
                        <i class="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">support@DCX.com</a></p>
                    </div>

                </div>

                <div class="footer-right">

                    <p class="footer-company-about">
                        <span>About the company</span>
                        Our CMS-based website effectively manages user roles and permissions while providing intuitive page authoring tools for easy creation and editing, ensuring seamless content management and dynamic online presence..
                    </p>

                    <div class="footer-icons">

                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>

                    </div>

                </div>

            </footer>
        </>
    );
}