import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Chip = ({ label, onDelete, hide }) => {
    return (
        <div 
            className='d-flex flex-wrap justify-content-center gap-1 border py-1 px-2 chip-container'
            style={{transition: 'border-color 0.3s ease',':hover': {borderColor: 'blue',} }}>
            <div>{label}</div>
            {hide && <div className='cursor-pointer text-gray-600' onClick={onDelete}><CloseRoundedIcon style={{ fontSize: '18px', cursor: 'pointer' }} /></div>}
        </div>
    )
}

const CourseChip = ({ item, onChangeCourses }) => {
    return <Chip label={item} onDelete={() => onChangeCourses(item, false)} hide={false} 
             style={{transition: 'border-color 0.3s ease', ':hover': {borderColor: 'blue',} }} />
}
const ZoneChip = ({ item, onChangeZone }) => {
    return <Chip label={item} onDelete={() => onChangeZone(item, false)} hide={true}     
            style={{ transition: 'border-color 0.3s ease', ':hover': {borderColor: 'blue'}
    }}
/>
}
const RatingChip = ({ item, onChangeRating }) => {
    return <Chip label={`Rating ${item}`} onDelete={() => onChangeRating(item, false)} hide={true}  
               style={{transition: 'border-color 0.3s ease',':hover': {borderColor: 'blue',cursor: 'pointer'} }} />
}
const FeeChip = ({ item, onChangeFee }) => {
    return <Chip label={`Fees ${item}`} onDelete={() => onChangeFee(item, '', false)} hide={true}     
             style={{transition: 'border-color 0.3s ease',':hover': {borderColor: 'blue',} }} />
}


const AppliedFilterList = ({ course, zone, rating, fee, onChangeZone, onChangeRating, onChangeFee }) => {
    return (
        <div className='d-flex align-items-center py-2 gap-3'>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>Applied Filter:</div>
            {course && <CourseChip
                item={course}
            />}
            {zone && <ZoneChip
                item={zone}
                onChangeZone={onChangeZone}
            />}
            {rating && <RatingChip
                item={rating}
                onChangeRating={onChangeRating}
            />}
            {fee && <FeeChip
            
                item={fee}
                onChangeFee={onChangeFee}
            />}
        </div>
    )
}

export default AppliedFilterList
