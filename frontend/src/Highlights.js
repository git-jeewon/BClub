import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import './Highlights.css'
import { FacebookEmbed,
         InstagramEmbed,
         LinkedInEmbed,
         TikTokEmbed,
         TwitterEmbed,
         YouTubeEmbed } from 'react-social-media-embed';
import { db } from "./Firebase";
import { ref, onChildAdded } from "firebase/database";

function useSocialMediaLinks(socialMedia) {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const path = "/highlights/" + socialMedia;
        const highlightsRef = ref(db, path);
        
        onChildAdded(highlightsRef, (data) => {
            setLinks(prevLinks => [...prevLinks, data.val().link]);
        });
    }, [socialMedia]);

    return links;
}

function Posts(props) {
    const links = useSocialMediaLinks(props.socialMedia);
    const filteredLinks = [...new Set(links)];
    const postsList = filteredLinks.map(
        (links) => 
        {
            if(props.socialMedia === "Facebook") {
            return (
                <div className="squares">
                    <FacebookEmbed url={links}/>
                </div>
            );
            }
            else if(props.socialMedia === "Instagram") {
                return (
                    <div className="squares">
                        <InstagramEmbed url={links}/>
                    </div>
                );
            }
            else if(props.socialMedia === "LinkedIn") {
                return (
                    <div className="squares">
                        <LinkedInEmbed url={links}/>
                    </div>
                );
            }
            else if(props.socialMedia === "TikTok") {
                return (
                    <div className="squares">
                        <TikTokEmbed url={links}/>
                    </div>
                );
            }
            else if(props.socialMedia === "Twitter") {
                return (
                    <div className="squares">
                        <TwitterEmbed url={links}/>
                    </div>
                );
            }
            else if(props.socialMedia === "YouTube") {
                return (
                    <div className="squares">
                        <YouTubeEmbed url={links}/>
                    </div>
                );
            }
            else {
                return (
                    <div className="squares">
                        Error loading social media!
                    </div>
                );
            }
        }
    );
    return (
        <div>
            <h2>{props.socialMedia}</h2>
            <div className="horizontal-scroll-wrapper">
                {postsList}
            </div>
        </div>
    );
}

export default function Highlights() {
    const socialMedias = ["Facebook", "Instagram", "LinkedIn", "TikTok", "Twitter", "YouTube"];

    const highlights = socialMedias.map((socialMedia) => <Posts socialMedia={socialMedia}/>);
    return(
        <>
            <Button className="submitButton" href="/highlightsform">
				Submit a highlight!
			</Button>
            <div>
                {highlights}
            </div>
        </>
    );
}
