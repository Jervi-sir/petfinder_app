export default {
  //Server: 'http://20.115.82.62:8000/api/v1/',
  Server: 'http://192.168.1.101:8000/api/v1/',
  //Auth
  Login: 'login',
  Register: 'register',
  Logout: 'logout',
  User: 'user',
  //Actions
  SavePet: 'auth/actions/save/',
  unSavePet: 'auth/actions/unsave/',
  ArchivePet: 'auth/actions/archive/',
  unArchivePet: 'auth/actions/unarchive/',
  deletePet: 'auth/actions/deletepet/',
  //profile
  getMyPets: 'auth/profile/my-pets',
  getSavedPets: 'auth/profile/saved-list',
  ShowMyProfileData: 'auth/profile/show-my-profile',
  getProfileForEdit: 'auth/profile/edit-profile',
  updateMyProfile: 'auth/profile/edit-profile',
  //pet auth add edit
  AddPet: 'auth/pet/add-pet',
  postPet: 'auth/pet/add-pet',
  EditPet: 'auth/pet/edit-pet/',
  updatePet: 'auth/pet/edit-pet/',
  //pet auth
  getPetAuth: 'auth/pets/id/',
  getLatestPetsAuth: 'auth/pets/latest',
  getByRaceAuth: 'auth/pets/race/',
  getLatestPetsByRaceAuth: 'auth/pets/latest/race=',
  //pet
  getPet: 'pets/id/',
  getByRace: 'pets/race/',
  getLatestPets: 'pets/latest',
  getLatestPetsByRace: 'pets/latest/race=',
  //search
  Search: 'search/keyword=',
}

