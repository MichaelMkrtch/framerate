"use client";

import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";
import AuthModal from "./AuthModal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function LandingPage() {
  return (
    <>
      <Backdrop
        title="House of the Dragon"
        backdropPath="https://image.tmdb.org/t/p/original/4zhmc5P9diArkyAizQgLfQ8sKLC.jpg"
        topPosition="top-10"
      />

      <span className="absolute -right-8 top-80 hidden rotate-[270deg] text-xs tracking-wider text-zinc-500 md:block">
        House of the Dragon (2024)
      </span>

      <section className="mt-[175px] text-center md:mt-[300px]">
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight md:text-3xl">
            Movie madness, managed.
          </h2>
          <p className="mt-3 text-center font-medium text-zinc-300 md:text-lg md:tracking-wide">
            Track your cinematic journey.
          </p>
        </div>

        <div className="mx-auto text-center">
          <AuthModal>
            <AuthModal.Trigger asChild>
              <button className="rounded bg-emerald-400 px-10 py-2 font-medium text-gray-850 transition-all duration-150 ease-out hover:shadow-[0_2px_20px_rgba(52,_211,_153,_0.7)] md:px-10">
                Get started
              </button>
            </AuthModal.Trigger>

            <AuthModal.Content title="Join Lumière">
              <SignupForm />
            </AuthModal.Content>
          </AuthModal>

          <div className="absolute right-2 top-1.5 h-1 w-14 md:right-0 md:top-0">
            <div className="fixed z-50 md:top-5">
              <AuthModal>
                <AuthModal.Trigger asChild>
                  <button className="py-2 font-medium text-zinc-300 transition-colors duration-150 ease-in-out hover:text-zinc-50">
                    Sign in
                  </button>
                </AuthModal.Trigger>

                <AuthModal.Content title="Sign in to your account">
                  <LoginForm />
                </AuthModal.Content>
              </AuthModal>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 pb-5">
        <div className="mx-auto grid w-fit gap-4 md:grid-cols-2 md:grid-rows-2">
          <Card classes="w-[330px] px-4">
            <h3 className="mb-1.5 font-medium tracking-wide text-zinc-300">
              Build your ultimate collection
            </h3>
            <p className="text-balance text-sm tracking-wide text-zinc-400">
              Lumière lets you save every film, series, and anime you&apos;ve
              seen.
            </p>
          </Card>

          <Card classes="w-[330px] px-4">
            <h3 className="mb-1.5 font-medium tracking-wide text-zinc-300">
              Create your personal database
            </h3>
            <p className="text-balance text-sm tracking-wide text-zinc-400">
              Save your ratings on a 5-star scale. Keep track of what you love.
            </p>
          </Card>

          <Card classes="w-[330px] px-4">
            <h3 className="mb-1.5 font-medium tracking-wide text-zinc-300">
              Find your next obsession
            </h3>
            <p className="text-balance text-sm tracking-wide text-zinc-400">
              Find your new favorites and see what others are currently
              watching.
            </p>
          </Card>

          <Card classes="w-[330px] px-4">
            <h3 className="mb-1.5 font-medium tracking-wide text-zinc-300">
              Collect movies, not dust
            </h3>
            <p className="text-balance text-sm tracking-wide text-zinc-400">
              Easily manage your watchlist. Create lists to track any topic you
              choose.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
