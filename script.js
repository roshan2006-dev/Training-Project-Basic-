document.addEventListener("DOMContentLoaded", function () {

    const options = document.querySelectorAll(".options p");

    const puzzleCards = document.querySelectorAll(".puzzle-card");

    let score = 0;

    let answeredQuestions = 0;


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const card = option.closest(".puzzle-card");


            if (card.classList.contains("answered")) {
                return;
            }


            card.classList.add("answered");


            if (option.dataset.answer === "correct") {

                option.classList.add("correct");

                score++;

            } else {

                option.classList.add("wrong");


                const correctOption =
                    card.querySelector('[data-answer="correct"]');


                if (correctOption) {

                    correctOption.classList.add("correct");

                }

            }


            answeredQuestions++;

            updateScore();


            if (answeredQuestions === puzzleCards.length) {

                showFinalScore();

            }

        });

    });


    function updateScore() {

        const scoreElement =
            document.querySelector("#score");


        if (scoreElement) {

            scoreElement.textContent = score;

        }

    }


    function showFinalScore() {

        const result =
            document.querySelector("#quiz-result");


        if (!result) {
            return;
        }


        result.classList.add("show");


        result.textContent =
            "Quiz completed! Your score is " +
            score +
            " out of " +
            puzzleCards.length +
            ".";

    }


    const resetButton =
        document.querySelector("#reset-quiz");


    if (resetButton) {

        resetButton.addEventListener("click", function () {


            score = 0;

            answeredQuestions = 0;


            options.forEach(function (option) {

                option.classList.remove(
                    "correct",
                    "wrong"
                );

            });


            puzzleCards.forEach(function (card) {

                card.classList.remove("answered");

            });


            updateScore();


            const result =
                document.querySelector("#quiz-result");


            if (result) {

                result.classList.remove("show");

                result.textContent = "";

            }

        });

    }


    const searchInput =
        document.querySelector("#player-search");


    const playerCards =
        document.querySelectorAll(".player-card");


    if (searchInput) {

        searchInput.addEventListener("input", function () {


            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            playerCards.forEach(function (card) {


                const playerName =
                    card
                        .querySelector("h2")
                        .textContent
                        .toLowerCase();


                const playerCountry =
                    card
                        .querySelector(".country")
                        .textContent
                        .toLowerCase();


                if (
                    playerName.includes(searchText) ||
                    playerCountry.includes(searchText)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    document.body.classList.add("page-loaded");

    const topButton =
        document.querySelector("#back-to-top");


    if (topButton) {


        window.addEventListener("scroll", function () {


            if (window.scrollY > 400) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        });


        topButton.addEventListener("click", function () {


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


        });

    }

});