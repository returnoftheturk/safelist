# Part 1

## Description

A NextJS app to allow user to query against the OFAC API with a customers full name, date of birth, and country.

The app works by taking in input from the user, validation exists at each step to ensure good data is inputted. Date of Birth has to be in YYYY-MM-DD format, while name and country have to have length > 0.

If good data is submitted, the user will either see "Hit" with the hits, or "Clear". If there is an error from the API, the user will see a tooltip that opens below the form to indicate that something went wrong.

I understand that the requirements mentioned birth year, but the free public [API](https://docs.ofac-api.com/screening-api/request) does not provide a param where the birth year can be inputted, only a date of birth.

The country input could be mapped to either `nationality`, `citizenship`, or `address.country`, I chose the third option as it's what made the most sense to me. However, I could not find a customer that returned `Address` as a "hit" unless more address fields were provided. The form could be improved to allow the input of `address.address1` which significantly improves the changes of a match of `Address`. This could be an improvement for V2.

The designs for Clear vs Hit can be improved given a more expertised design from a designer.

## Public URL

https://safelist-swart.vercel.app/

```
Example usage:
Name: Wei Sun
DoB: 1982-07-01
Country: China
```

The free tier mentioned only 100 request per month. There should ideally be requests left, but I did make quiet a bit of requests so could be getting close to the limit...

## Optimizations

There are many optimizations that can be made. There currently exists no backend to cache information once its retrieved. For example, once there is a hit found, it could be stored in a backend DB to avoid unnecessary and expensive calls to the API.

UI can be improved for better user flow.

Validations at each step can be improved.

## Missing pieces

For an actual fully scalable web application, tests are incredibly important, both unit and component testing.

A CI/CD implementaion would make the development much more scalable too.
