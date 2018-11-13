using System.Collections.Generic;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data {
    public class Seed {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public Seed (UserManager<User> userManager, RoleManager<Role> roleManager) {
            _roleManager = roleManager;
            _userManager = userManager;

        }

        public void SeedUsers () {
            var userData = System.IO.File.ReadAllText ("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>> (userData);
            //initiate and add roles to role table
            var roles = new List<Role>
            {
                new Role{Name = "Admin"},
                new Role{Name = "Moderator"},
                new Role{Name = "VIP"},
                new Role{Name = "Member"},
            };

            foreach (var role in roles)
            {
                _roleManager.CreateAsync(role).Wait();
            }
            //for each user add initial role as member
            foreach (var user in users) {

                _userManager.CreateAsync (user, "password").Wait (); //the wait is put because it is not async function
                _userManager.AddToRoleAsync(user, "Member").Wait();
            }

            // create Admin user and add roles Admin and moderator
            var  adminUser = new User
            {
                UserName = "Admin"
            };

            IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;
            if (result.Succeeded)
            {
                var admin = _userManager.FindByNameAsync("Admin").Result;
                _userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
            };

        }

    }
}