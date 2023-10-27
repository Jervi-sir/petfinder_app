export default {
  //Server: 'http://20.115.82.62:8000/api/v1/',
  Server: 'http://150.136.217.184:8000/api/v1/',
  //Auth
  Login: 'login',
  Register: 'register',
  Logout: 'logout',
  User: 'user',
  Auth: 'auth/',
  validate_token: 'validate_token',
  //pet
  getLatestPets: 'pets/latest',
  getLatestLostPets: 'lostpets/latest',
  //search
  Search: 'pets/search',

  //addPet
  addPetHelpers: 'auth/pet/add-pet-helpers',
  //editProfile
  getProfileForEdit: 'auth/profile/edit-profile',


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
  getPet: 'pets/id/',
  getByRace: 'pets/race/',
  getLatestPetsByRace: 'pets/latest/race=',

}

