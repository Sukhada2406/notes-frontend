import React , {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/cards/NoteCard';
import {MdAdd} from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from '../../assets/images/add-notes.svg';
import NoDataImg from '../../assets/images/no-data.svg';

Modal.setAppElement('#root');

const Home = () => {

  const [openAddEditModal , setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg , setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes ,setAllNotes] = useState([]);
  const [userInfo , setuserInfo ] = useState(null);

  const [isSearch , setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown : true, data: noteDetails , type: "edit"});
  };

  const showToastMessage = (message , type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  //Get User info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user) {
        setuserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all Notes
  const getAllNotes = async () => {
      try{
        const response = await axiosInstance.get("/get-all-notes");

        if(response.data && response.data.notes) {
          setAllNotes(response.data.notes);
        }
      } catch (error) {
        console.log("An unexpected error occured. Please try again. ");
      }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try{
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if(response.data && !response.data.error) {
          showToastMessage("Note Deleted Successfully", 'delete');
          getAllNotes();
          onClose();
      }
  }catch(error){
      if(
          error.response &&
          error.response.data &&
          error.response.data.message
      ){
        console.log("An unexpected error occured. Please try again. ");
      }
  }
  }

  // Search Notes
  const onSearchNote = async (query) => {
      try{
        const response = await axiosInstance.get("/search-notes",{
          params: { query },
        });

        if(response.data && response.data.notes){
          setIsSearch(true);
          setAllNotes(response.data.notes);
        }
      } catch ( error ){
        console.log(error);
      }
  };

  // Pinned Note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
        
    try{
        const response = await axiosInstance.put("/update-pinned-note/" + noteId, {
           isPinned: !noteData.isPinned,
        });
        if(response.data && response.data.note) {
            // showToastMessage("Note Pinned Successfully");
            showToastMessage(noteData.isPinned ? "Note Unpinned Successfully" : "Note Pinned Successfully");
            getAllNotes();
        }
    }catch(error){
        console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo();
    return () => {}
  },[]);

  return (
    <>
      <Navbar userInfo ={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
        <div className='grid grid-cols-3 gap-4 mt-10 '>
          {allNotes.map((item, index) => (
            < NoteCard 
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={()=> handleEdit(item)}
            onDelete={()=> deleteNote(item)}
            onPinNote={()=> updateIsPinned(item)}
            />
          ))}
        </div> 
        ) : (
        <EmptyCard imgSrc={isSearch ? NoDataImg : AddNotesImg} message={isSearch ? `Sorry no notes found to your search!`:'Start Creating New Notes. Click on Add button to get started!'}/>
      )}
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10' 
      
      onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null});
      }}>
      
      <MdAdd className="text-[32px] text-white"/>

      </button>

      <Modal 
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {() => {}}
        style ={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)",
          },
        }}
        contentLabel = ""
        className = "w-[600px] max-h-3/4 bg-white rounded-lg mx-auto mt-27 p-5 overflow-scroll"
        >
      <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({ isShown: false , type: "add" , data : null });
        }}
        getAllNotes={getAllNotes}
        showToastMessage={showToastMessage}
      />
      </Modal>

      <Toast
        isShown = {showToastMsg.isShown}
        message = {showToastMsg.message}
        type = {showToastMsg.type}
        onClose = {handleCloseToast}
      />
    </>
  )
}

export default Home