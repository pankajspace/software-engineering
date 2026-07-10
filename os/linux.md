[<- OS](os-quick.md)

## Linux File Permissions

In Linux, file permissions are an important feature that controls who can access and modify files and directories. Permissions determine how files and directories can be read, written, or executed by different users. Here’s a detailed breakdown of Linux permissions:

### 1. Types of Users
Each file and directory is associated with three types of users:

- **Owner**: Usually the person who created the file. The owner can have specific permissions different from others.
- **Group**: Each file belongs to a group. Users in the same group may have similar access to files and directories.
- **Others**: All other users on the system who are not the owner or in the group.

### 2. Types of Permissions
Each user type can have three types of permissions:

- **Read (r)**: Permission to read the file or list the contents of a directory.
- **Write (w)**: Permission to modify the contents of the file or add/remove files in a directory.
- **Execute (x)**: Permission to execute the file as a program or script. For directories, execute permission allows users to enter (or "cd" into) the directory.

### 3. Permission Notation
Permissions in Linux can be represented in two ways:

- **Symbolic Notation**: A string of letters and dashes, like `-rwxr-xr--`.
- **Octal Notation**: A numeric representation, where each permission type is assigned a number.

#### Symbolic Notation
The symbolic notation has 10 characters, organized as follows:

| Character Position | Purpose                                     |
| ------------------ | ------------------------------------------- |
| 1                  | File type (`-` for file, `d` for directory) |
| 2-4                | Owner permissions (r, w, x)                 |
| 5-7                | Group permissions (r, w, x)                 |
| 8-10               | Others permissions (r, w, x)                |

For example, `-rwxr-xr--` means:

- `-` - regular file
- `rwx` - the owner has read, write, and execute permissions
- `r-x` - the group has read and execute permissions
- `r--` - others have read-only permission

#### Octal Notation
Each permission type (read, write, execute) has an associated number:

- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1

By summing these values, you get a single digit for each user type:

- `7` (4+2+1) = Read, write, execute
- `6` (4+2) = Read, write
- `5` (4+1) = Read, execute
- `4` = Read only

For example, `755` means:

- `7` - owner has read, write, and execute permissions
- `5` - group has read and execute permissions
- `5` - others have read and execute permissions

### 4. Changing Permissions
To change file permissions, Linux uses the `chmod` command.

- **Symbolic method**: `chmod u=rwx,g=rx,o=r filename`
  - `u`, `g`, `o` represent the owner (user), group, and others, respectively.
  - `+` adds permission, `-` removes permission, `=` sets exact permissions.

- **Octal method**: `chmod 755 filename`

### 5. Special Permissions
In addition to the standard permissions, Linux has some special permissions:

- **Setuid (Set user ID)**: `chmod u+s filename` – allows a user to run an executable with the file owner’s permissions.
- **Setgid (Set group ID)**: `chmod g+s directory` – files created in the directory inherit the group of the directory.
- **Sticky Bit**: `chmod +t directory` – only the file owner can delete files within the directory, commonly used in shared directories like `/tmp`.

### Example: Viewing and Setting Permissions

To view file permissions, use the `ls -l` command:
```bash
ls -l filename
```

To set permissions, use the `chmod` command:
```bash
chmod 755 filename
```

### Summary Table

| Permission | Octal | Description          |
| ---------- | ----- | -------------------- |
| `rwx`      | 7     | Read, write, execute |
| `rw-`      | 6     | Read, write          |
| `r-x`      | 5     | Read, execute        |
| `r--`      | 4     | Read only            |
| `-wx`      | 3     | Write, execute       |
| `-w-`      | 2     | Write only           |
| `--x`      | 1     | Execute only         |
| `---`      | 0     | No permissions       |

Understanding these permissions is essential for managing file access securely in Linux systems.

---

## Linux commands

Here are some of the most widely used Linux commands with explanations and examples for each:

### 1. `ls` - List Directory Contents
The `ls` command lists files and directories in the current directory.

```bash
ls          # Basic listing
ls -l       # Long listing with details like permissions, owner, and size
ls -a       # Show hidden files (those starting with ".")
ls -lh      # Human-readable file sizes in long format
```

### 2. `cd` - Change Directory
The `cd` command is used to navigate between directories.

```bash
cd /path/to/directory   # Change to specified directory
cd ..                   # Go up one directory level
cd                      # Go to home directory
```

### 3. `pwd` - Print Working Directory
Displays the current directory path.

```bash
pwd                     # Show current directory path
```

### 4. `cp` - Copy Files and Directories
The `cp` command copies files or directories from one location to another.

```bash
cp file1 file2                 # Copy file1 to file2
cp -r directory1 directory2    # Copy directory1 to directory2 recursively
```

### 5. `mv` - Move/Rename Files and Directories
Moves or renames files and directories.

```bash
mv oldname newname             # Rename file or directory
mv file1 /path/to/directory    # Move file1 to specified directory
```

### 6. `rm` - Remove Files or Directories
Deletes files and directories.

```bash
rm file                     # Delete a file
rm -r directory             # Recursively delete a directory and its contents
rm -i file                  # Prompt before deleting (useful for caution)
```

### 7. `mkdir` - Make Directory
Creates a new directory.

```bash
mkdir new_directory         # Create a new directory
mkdir -p dir1/dir2          # Create nested directories
```

### 8. `rmdir` - Remove Empty Directories
Removes an empty directory.

```bash
rmdir empty_directory       # Remove an empty directory
```

### 9. `cat` - Concatenate and Display File Content
Displays the contents of a file.

```bash
cat filename                # Display file contents
cat file1 file2             # Concatenate two files and display them together
```

### 10. `nano` or `vim` - Text Editors
These are command-line text editors. `nano` is more user-friendly, while `vim` is more advanced.

```bash
nano filename               # Open a file in nano for editing
vim filename                # Open a file in vim for editing
```

### 11. `touch` - Create a New Empty File
Creates a new, empty file.

```bash
touch filename              # Create a new empty file
```

### 12. `chmod` - Change File Permissions
Modifies the permissions of a file or directory.

```bash
chmod 755 filename          # Change permissions to rwxr-xr-x
chmod u+x script.sh         # Give execute permission to the owner
```

### 13. `chown` - Change File Owner and Group
Changes the owner and/or group of a file or directory.

```bash
chown user filename         # Change the owner of a file
chown user:group filename   # Change the owner and group
```

### 14. `find` - Search for Files and Directories
Searches for files and directories based on various criteria.

```bash
find /path -name filename                # Search for a file by name
find . -type d                           # Find all directories in the current directory
find /path -size +100M                   # Find files larger than 100 MB
```

### 15. `grep` - Search Text in Files
Searches for a specific text pattern in files.

```bash
grep "text" filename                     # Search for "text" in a file
grep -r "text" /path/to/directory        # Recursively search for "text" in a directory
```

### 16. `df` - Disk Space Usage
Displays disk space usage of file systems.

```bash
df                     # Show disk usage for all mounted file systems
df -h                  # Human-readable format
```

### 17. `du` - Directory Space Usage
Shows the disk usage of a directory and its contents.

```bash
du                     # Show disk usage of current directory and subdirectories
du -sh directory       # Show total size of a directory in human-readable format
```

### 18. `tar` - Archive Files
Used to create, extract, or view archives.

```bash
tar -cvf archive.tar /path/to/files      # Create a .tar archive
tar -xvf archive.tar                     # Extract an archive
tar -czvf archive.tar.gz /path/to/files  # Create a compressed .tar.gz archive
```

### 19. `ps` - View Running Processes
Displays information about running processes.

```bash
ps                      # Show current session's running processes
ps aux                  # Show all processes running on the system
ps -ef                  # Detailed listing of processes
```

### 20. `kill` - Terminate Processes
Sends a signal to terminate a process.

```bash
kill process_id         # Terminate a process with the specified PID
kill -9 process_id      # Force terminate a process
```

### 21. `top` - Monitor System Resources
Real-time view of system resource usage, including CPU, memory, and running processes.

```bash
top                     # Start top monitoring
```

### 22. `wget` - Download Files from the Internet
Downloads files from a given URL.

```bash
wget http://example.com/file.zip      # Download a file from the internet
wget -c http://example.com/file.zip   # Continue a partially downloaded file
```

### 23. `curl` - Transfer Data to/from URLs
Transfers data from or to a server. Commonly used for testing APIs and downloading files.

```bash
curl http://example.com               # Fetch contents of a URL
curl -O http://example.com/file.zip   # Download a file
```

### 24. `history` - View Command History
Shows previously entered commands.

```bash
history                 # Show command history
!number                 # Re-run a specific command by its number
```

### 25. `man` - Display Command Manual
Displays the manual page for a command, providing details on usage and options.

```bash
man ls                  # Show manual for the ls command
man grep                # Show manual for the grep command
```

These are some of the essential Linux commands for everyday tasks, file management, process handling, and system monitoring. Each command has multiple options, which you can explore in more detail by using the `man` command or by checking the command's `--help` option.

---

## Linux File System Hierarchy

The hierarchy is defined by the **Filesystem Hierarchy Standard (FHS)**, which gives rules about where files and directories should be placed. This helps make Linux distributions consistent.

### 1. **Root (`/`)**

* The **top of the filesystem tree**.
* Everything (files, directories, devices) exists under `/`.

---

### 2. **Essential Directories** (needed for booting and minimal operation)

* **`/bin`** → Essential **user binaries** (commands like `ls`, `cp`, `cat`).
* **`/sbin`** → Essential **system binaries** (admin commands like `fsck`, `mount`, `reboot`).
* **`/etc`** → **Configuration files** (system-wide settings, e.g., `/etc/passwd`, `/etc/ssh/sshd_config`).
* **`/lib` & `/lib64`** → Essential **libraries** (shared `.so` files used by programs in `/bin` & `/sbin`).
* **`/boot`** → Bootloader files (kernel `vmlinuz`, `initramfs`, GRUB).
* **`/dev`** → Device files (e.g., `/dev/sda` for disks, `/dev/null`).

---

### 3. **User and Administrator Areas**

* **`/home`** → Personal files & configs for users (`/home/alice`, `/home/bob`).
* **`/root`** → Home directory for **root user** (system admin).

---

### 4. **Temporary & Runtime**

* **`/tmp`** → Temporary files (cleared at reboot or regularly).
* **`/run`** → Runtime process info (PIDs, sockets, since last boot).

---

### 5. **System Information (Virtual Filesystems)**

* **`/proc`** → Virtual FS for **process & kernel info** (`/proc/cpuinfo`, `/proc/meminfo`).
* **`/sys`** → Virtual FS for **device & kernel information**.

---

### 6. **Applications & User Programs**

* **`/usr`** (user programs & data, not essential for boot):

  * `/usr/bin` → Non-essential user commands (e.g., `python`, `gcc`).
  * `/usr/sbin` → Non-essential system binaries (e.g., `apachectl`).
  * `/usr/lib` → Libraries for `/usr/bin` & `/usr/sbin`.
  * `/usr/share` → Architecture-independent data (man pages, docs, icons).
  * `/usr/local` → Locally installed software (compiled by user).

---

### 7. **Variable Data**

* **`/var`** → Files that **change frequently**:

  * `/var/log` → System logs.
  * `/var/tmp` → Longer-lived temp files.
  * `/var/spool` → Queued tasks (print jobs, mail).
  * `/var/cache` → Cache files.

---

### 8. **Mount Points**

* **`/media`** → Removable media (USB, CD-ROM, external drives).
* **`/mnt`** → Temporary mount point for sysadmins.
* **`/srv`** → Data for services (web, FTP, databases).

---

### 🌳 **Hierarchy Diagram (Simplified)**

```
/
├── bin/        → Essential user commands
├── sbin/       → System binaries
├── boot/       → Bootloader, kernel
├── dev/        → Device files
├── etc/        → Configuration
├── home/       → User home dirs
│   └── user1/
│   └── user2/
├── lib/        → Shared libraries
├── lib64/      → 64-bit libraries
├── media/      → Removable media
├── mnt/        → Temporary mounts
├── opt/        → Optional software
├── proc/       → Process info (virtual)
├── root/       → Root user home
├── run/        → Runtime info
├── srv/        → Service data
├── sys/        → Kernel info (virtual)
├── tmp/        → Temporary files
├── usr/        → User programs & data
│   ├── bin/
│   ├── sbin/
│   ├── lib/
│   ├── share/
│   └── local/
└── var/        → Variable data (logs, cache)
```

---

👉 In short:

* `/bin`, `/sbin`, `/lib`, `/etc`, `/boot` = **critical for booting**
* `/usr`, `/var`, `/home` = **user applications & data**
* `/proc`, `/sys`, `/dev` = **virtual/system interfaces**
* `/tmp`, `/run` = **temporary/runtime**

---

[<- OS](os-quick.md)