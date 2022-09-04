import React, { useEffect } from 'react';
import glass from '../assets/search.png'
import { useState } from 'react'

const Navbar = ({ searchTerm, setSearchTerm, distinctTerms, setDistinctTerms }) => {
  const arr = ["dog", "cat", "ant", 'bear', "awp", "elephant", "dope", "amd"]

  const [value, setValue] = useState('');
  const onWordTyped = (e) => {
    setValue(e.target.value)
    if (e.target.value == ''){
      console.log("Emptied")
      setSearchTerm("HEY")
    }
  }


  useEffect(() => {
    if (distinctTerms) {
      console.log("distinct term received in navbar = " + distinctTerms)
    }
  }, [distinctTerms, setDistinctTerms])


  const onSearch = (e, f_item) => {

    setValue(f_item)

    const terms = []
    if (distinctTerms) {
      for (let i = 0; i < distinctTerms.length; i++) {
        if (distinctTerms[i].startsWith(f_item))
          terms.push(distinctTerms[i])
      }
      console.log("onSearch result: " + terms + " and value = " + f_item)
      setSearchTerm(f_item)

    }

  }

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <h1>ImageRepo</h1>


        <div className='barAndDropdownContainer'>
          <div className='searchFormContainer'>
            <input placeholder='Search for image...' onChange={onWordTyped} value={value || ""}></input>
            <button className="search-button" onClick={(e) => onSearch(e, value)}>
              <img src={glass} alt="ok" />
            </button>
          </div>


          <div className='dropdown'>
            {

              (distinctTerms && distinctTerms?.filter((item) => {
                if (value === undefined)
                  return false;

                const sTerm = value.toString().toLowerCase();
                const fullName = item.toString().toLowerCase();
                return sTerm && fullName.startsWith(sTerm) && fullName !== sTerm
              }))
                ?.map((f_item) => {
                  return (
                    <div className='dropdown-row' onClick={(e) => onSearch(e, f_item)} key={f_item}>
                      {f_item}
                    </div>
                  )
                })}
          </div>
        </div>


      </div>



      <h2>
        Place to organize your images
      </h2>

    </div>

  )
}

export default Navbar; 
