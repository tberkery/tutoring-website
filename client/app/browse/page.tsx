"use client";

import React, { FC, useState } from "react";
import "../../styles/global.css";
import NavBar from "@/components/Navbar";
import "../../styles/basic.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import BrowseSection from "@/components/BrowseSection";

const Page : FC = () => {
  const [filterCourses, setFilterCourses] = useState(false);
  const [filterActivities, setFilterActivities] = useState(false);

  const [sortByPriceHighToLow, setSortByPriceHighToLow] = useState(false);
  const [sortByPriceLowToHigh, setSortByPriceLowToHigh] = useState(false);

  const handleCourseFilterChange = () => {
    setFilterCourses(!filterCourses);
  };

  const handleActivityFilterChange = () => {
    setFilterActivities(!filterActivities);
  };

  const handlePriceHighToLowChange = () => {
    setSortByPriceHighToLow(!sortByPriceHighToLow);
  };
  
  const handlePriceLowToHighChange = () => {
    setSortByPriceLowToHigh(!sortByPriceLowToHigh);
  };

  return <>
  <NavBar />
    <div className="flex min-h-screen">
        <div className="w-1/4 flex flex-col items-center py-3 bg-blue-300">
            <div className="input-container my-6">
                <input type="text" name="text" className="input"></input>
                <label className="label">Search</label>
                <div className="top-line"></div>
                <div className="under-line"></div>
            </div>
            <div className="FilterRecipes">
                <h1>filter listings</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>By Type</AccordionTrigger>
                        <AccordionContent>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                type="checkbox" 
                                id="cbx-46" 
                                className="inp-cbx" 
                                onChange={handleCourseFilterChange}
                                checked={filterCourses}
                                />
                                <label htmlFor="cbx-46" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Courses</span>
                                </label>
                            </div>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                type="checkbox" 
                                id="cbx-47" 
                                className="inp-cbx" 
                                onChange={handleActivityFilterChange}
                                checked={filterActivities}
                                />
                                <label htmlFor="cbx-47" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Activities</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>By Price</AccordionTrigger>
                        <AccordionContent>
                        <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-48" 
                                    className="inp-cbx" 
                                    onChange={handlePriceLowToHighChange}
                                    checked={sortByPriceLowToHigh}
                                    />
                                <label htmlFor="cbx-48" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Low-to-High</span>
                                </label>
                            </div>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-49" 
                                    className="inp-cbx" 
                                    onChange={handlePriceHighToLowChange}
                                    checked={sortByPriceHighToLow}
                                    />
                                <label htmlFor="cbx-49" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>High-to-Low</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>By Tag</AccordionTrigger>
                        <AccordionContent>
                        Tags Here! 
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
        <div className="w-3/4">
            <BrowseSection filterCourses={filterCourses} filterActivities={filterActivities} 
            sortByPriceLowToHigh={sortByPriceLowToHigh} sortByPriceHighToLow={sortByPriceHighToLow}/>
        </div>
    </div>
    </>;
};

export default Page;
