export const api = {
  Server: 'http://192.168.1.107:8000/api/v1/',
  //Auth
  Login: 'login',
  Register: 'register',
  Logout: 'logout',
  //Actions
  Like: 'like',
  unLike: 'unlike',
  SavePet: 'save/',
  unSavePet: 'unsave/',
  Comment: 'comment',
  unComment: 'uncomment',
  //profile
  getMyPets: 'my-pets',
  getSavedPets: 'saved-list',
  ShowMyProfileData: 'showMyProfile',
  getProfileForEdit: 'profile-edit-get',
  updateMyProfile: 'profile-edit-update',
  //pet
  getPet: 'pet/',
  AddPet: 'get-add-pet',
  postPet: 'add-pet',
  EditPet: 'edit-pet',
  UPDATEPET: 'update-pet',
  deletePet: 'delete-pet',
  //search
  getRace: 'race',
  getLatestPets: 'pets-latest',
  getLatestPetsByFilter: 'pets-latest/filter=',
  Search: 'search?&keyword=',
  getLatestPetsAuth: 'auth/pets-latest'
}

