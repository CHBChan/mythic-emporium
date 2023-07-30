function UserProfile({params} : any) {

    return (
        <div>
            <p className='text-4xl'>Profile page {params.id}</p>
        </div>
    )
}

export default UserProfile;