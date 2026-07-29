const SUPABASE_URL = "https://nbqxtuakjpvqnmpbswbc.supabase.co";
const SUPABASE_KEY = "sb_publishable_v3iqgiZkKwhZtu-IOLI5UQ_hCIcQN9e";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let movies = [];

$(document).ready(function () {

    loadMovies();

    $("#loginBtn").click(function () {

        if ($("#username").val() === "Radhika" &&
            $("#password").val() === "BRadhika@123") {

            $("#loginBox").hide();
            $("#adminPanel").removeClass("d-none");

        } else {

            $("#msg").text("Invalid Login");

        }

    });

    $("#addMovie").click(async function () {

        let movie = {

            title: $("#title").val(),

            poster: $("#poster").val(),

            trailer: $("#trailer").val(),

            keywords: $("#keywords").val().toLowerCase(),

            details: $("#details").val()

        };

        const { error } = await supabaseClient
            .from("movies")
            .insert([movie]);

        if (error) {

            alert("Movie Upload Failed");
            console.log(error);

        } else {

            alert("Movie Uploaded Successfully");

            clearForm();

            loadMovies();

        }

    });

    $("#search").on("keyup", function () {

        let key = $(this).val().toLowerCase();

        let filtered = movies.filter(function (m) {

            return m.keywords.includes(key) ||
                   m.title.toLowerCase().includes(key);

        });

        displayMovies(filtered);

    });

});

async function loadMovies() {

    const { data, error } = await supabaseClient
        .from("movies")
        .select("*");

    if (error) {

        console.log(error);

    } else {

        movies = data;

        displayMovies(movies);

    }

}

function displayMovies(list) {

    $("#movieList").empty();

    if (list.length == 0) {

        $("#movieList").html("<h3 class='text-center text-white'>No Movies Found</h3>");

        return;

    }

    list.forEach(function (m) {

        $("#movieList").append(`

        <div class="col-md-4 mb-3">

            <div class="card h-100">

                <img src="${m.poster}" class="card-img-top" height="300">

                <div class="card-body">

                    <h5>${m.title}</h5>

                    <p>${m.details}</p>

                    <a href="${m.trailer}" target="_blank"
                       class="btn btn-danger">

                        Watch Trailer

                    </a>

                </div>

            </div>

        </div>

        `);

    });

}

function clearForm() {

    $("#title").val("");

    $("#poster").val("");

    $("#trailer").val("");

    $("#keywords").val("");

    $("#details").val("");

}