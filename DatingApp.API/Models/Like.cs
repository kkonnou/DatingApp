namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; }  // user id who likes another user
        public int LikeeId { get; set; } // user been liked by another user id
        public User Liker { get; set; }  // user likes another user
        public User Likee { get; set; } // user been liked by another user
    }
}