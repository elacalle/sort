# Sort

**Sort** is a TypeScript application that replicates the functionality of the Linux `sort` command, allowing it to be executed in Node.js.

## Features

- Supports sorting using **quicksort** and **radix sort**.
- Compatible with **UTF-8** encoded files.
- Sorting is based on ASCII character order (does not take system locale into account).

## Available Commands

- `--sort=sort` → Sorts using **radix sort** (default mode).
- `--sort=radix` → Sorts a text string using **radix sort**.

## To-Do

- Implement the **Merge Sort** algorithm.
- Add support for sorting files while respecting the English locale.
- Optimize the **external merge algorithm** to avoid **O(n)** complexity and improve sorting time.
- Add a installation script to install it in the system
- Improve Async error handling
