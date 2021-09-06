export const OverlayLoading = ({isLoading}) =>{

    if(isLoading){
        return <div className="overlay">
            <p style={{ margin: 'auto', fontSize: '20px' }}>...กำลังค้นหาข้อมูล...</p>
        </div>
    }
    return ''
}