import React from 'react';



interface NoteType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const NoteSidebar = ({ isMobileSidebarOpen, onSidebarClose }: NoteType) => {
 
  return (
    
  );
};

export default NoteSidebar;
