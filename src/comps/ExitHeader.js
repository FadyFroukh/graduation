import { FaTimes } from 'react-icons/fa';

function ExitHeader({showMenu,setShowMenu}){

    const handleClose = ()=>{
        setShowMenu(!showMenu);
    }

    return(
        <>
            <header className="exit-header">
                <FaTimes className="exit-icon" onClick={handleClose}/>
            </header>
        </>
    );
}

export default ExitHeader;