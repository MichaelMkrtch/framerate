package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from any origin for local dev
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"message": "ping from Go backend!"}`)
	})

	port := "8080" // Port for the Go backend
	fmt.Printf("Go backend listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
