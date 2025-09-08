
function MyModal({children, className, id}) {  
    return (

      <div className={`modal fade ${className}`} id={id} tabIndex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
        <button style={{top: '1rem', right: '1rem', zIndex: '1'}} type="button" className="btn-close position-absolute" data-bs-dismiss="modal" aria-label="Close"></button>
              <div className="modal-body">
                {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MyModal;
  