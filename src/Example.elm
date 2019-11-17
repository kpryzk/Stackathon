module Main exposing (Model(..), Msg(..), getRandomCard, imageDecoder, init, main, subscriptions, update, view, viewCard)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (..)



-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type Model
    = Failure
    | Loading
    | Success String


type alias Card =
    { name : String
    , imageUrl : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading, getRandomCard )



-- UPDATE


type Msg
    = MorePlease
    | GotCard (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MorePlease ->
            ( Loading, getRandomCard )

        GotCard result ->
            case result of
                Ok name ->
                    ( Success name, Cmd.none )

                Err _ ->
                    ( Failure, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h2 [] [ text "Tarot" ]
        , viewCard model
        ]


viewCard : Model -> Html Msg
viewCard model =
    case model of
        Failure ->
            div []
                [ text "I could not load a card. "
                , button [ onClick MorePlease ] [ text "Try Again!" ]
                ]

        Loading ->
            text "Loading..."

        Success name ->
            div []
                [ button [ onClick MorePlease, style "display" "block" ] [ text "More Please!" ]

                -- , img [ src name ] []
                , pre [] [ text name ]
                ]



-- HTTP


getRandomCard : Cmd Msg
getRandomCard =
    Http.get
        { url = "http://localhost:5885/api/tarot/randomCard"
        , expect = Http.expectJson GotCard cardDecoder
        }


nameDecoder : Decoder String
nameDecoder =
    field "name" string


imageDecoder : Decoder String
imageDecoder =
    field "imageUrl" string


cardDecoder : Decoder Card
cardDecoder =
    map2 Card
        nameDecoder
        imageDecoder
