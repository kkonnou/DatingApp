using System.Collections.Generic;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data {
    public class Seed {
        private readonly UserManager<User> _userManager;

        public Seed (UserManager<User> userManager) {
            _userManager = userManager;

        }

        public void SeedUsers () {
            var userData = System.IO.File.ReadAllText ("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>> (userData);
            foreach (var user in users) {
               
               _userManager.CreateAsync(user, "password").Wait(); //the wait is put because it is not async function
  
            }

            
        }

    }
}