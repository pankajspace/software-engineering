[<- CS](cs-quick.md)

# Git Main Concepts

Git is a distributed version control system that helps developers manage code and track changes across projects. Here are the main concepts of Git:

---

## 1. Repository (Repo)

A repository is a directory or storage space where your project files and the entire history of changes are stored. There are two types of repositories:
- Local repository: The repository on your machine where you make changes.
- Remote repository: A repository stored on a remote server (like GitHub, GitLab, Bitbucket) where team members collaborate.

#### Commands:
- To initialize a new local repository:
  ```bash
  git init
  ```
- To clone an existing remote repository:
  ```bash
  git clone https://github.com/user/repo.git
  ```

---

## 2. Commit

A commit is a snapshot of the project at a specific point in time. It includes all changes that were added to the staging area and serves as a save point in the version control system.

#### Command:
- To commit staged changes:
  ```bash
  git commit -m "Commit message describing changes"
  ```

---

## 3. Staging Area (Index)

The staging area (also called the index) is where you prepare your changes before committing them. Only the files that are added to the staging area will be included in the next commit.

#### Command:
- To add changes to the staging area:
  ```bash
  git add <file>  # Stage specific files
  git add .       # Stage all modified files
  ```

---

## 4. Branch

A branch is a separate line of development. By default, Git creates a `main` or `master` branch, but you can create additional branches to work on features or fixes without affecting the main codebase.

#### Commands:
- To create a new branch:
  ```bash
  git branch <branch-name>
  ```
- To switch to a different branch:
  ```bash
  git checkout <branch-name>
  ```
- To create and switch to a new branch in one command:
  ```bash
  git checkout -b <branch-name>
  ```

---

## 5. Merge

Merging is the process of integrating changes from one branch into another. Typically, after working on a feature branch, you merge it back into the `main` branch.

#### Command:
- To merge changes from a branch into the current branch:
  ```bash
  git merge <branch-name>
  ```

---

## 6. Conflict

A merge conflict occurs when Git cannot automatically resolve differences between two branches. You need to manually resolve conflicts and mark them as resolved.

#### Steps:
1. Git will mark the conflicting parts of the files.
2. Open the conflicting file and resolve the differences.
3. After resolving conflicts, mark the file as resolved:
   ```bash
   git add <file>
   ```
4. Complete the merge:
   ```bash
   git commit
   ```

---

## 7. Pull

The `git pull` command updates your local repository with the latest changes from the remote repository. It fetches the changes and automatically merges them into your current branch.

#### Command:
```bash
git pull <remote> <branch>
```

---

## 8. Push

Pushing sends your local commits to the remote repository. After committing your changes, use `git push` to update the remote branch with your local changes.

#### Command:
```bash
git push <remote> <branch>
```

---

## 9. Remote

A remote is a reference to a repository hosted on the internet or network. Typically, the main remote is referred to as `origin`, but you can have multiple remotes (e.g., `upstream` for the original repository).

#### Commands:
- To view your current remotes:
  ```bash
  git remote -v
  ```
- To add a remote repository:
  ```bash
  git remote add origin https://github.com/user/repo.git
  ```

---

## 10. Fetch

Fetching downloads changes from the remote repository but does not automatically merge them into your local branch. It updates your remote tracking branches.

#### Command:
```bash
git fetch <remote>
```

---

## 11. Rebase

Rebasing is another way to integrate changes from one branch into another. Unlike `merge`, which creates a merge commit, `rebase` rewrites the commit history, creating a cleaner, linear history.

#### Command:
- To rebase the current branch onto another branch:
  ```bash
  git rebase <branch>
  ```

---

## 12. Checkout

The `git checkout` command is used to switch between branches or to restore files to a previous state.

#### Command:
- To switch branches:
  ```bash
  git checkout <branch-name>
  ```
- To restore a file to a specific commit:
  ```bash
  git checkout <commit-hash> <file-path>
  ```

---

## 13. Reset

Resetting moves the HEAD (current branch pointer) to a specific commit. You can reset in three ways:
- Soft: Keeps your changes in the staging area.
- Mixed: Keeps your changes but removes them from the staging area.
- Hard: Discards all changes and resets the working directory.

#### Command:
- To reset to a specific commit:
  ```bash
  git reset --soft <commit-hash>
  git reset --mixed <commit-hash>
  git reset --hard <commit-hash>
  ```

---

## 14. Log

The `git log` command shows the commit history for the current branch.

#### Command:
```bash
git log
```
- To view a simplified log:
  ```bash
  git log --oneline
  ```

---

## 15. Status

The `git status` command shows the current state of the working directory and the staging area. It tells you which files have been modified, staged, or committed.

#### Command:
```bash
git status
```

---

## 16. Stash

The `git stash` command allows you to temporarily save your changes (without committing them) and switch branches or perform other tasks. You can later reapply the stashed changes.

#### Command:
- To stash changes:
  ```bash
  git stash
  ```
- To reapply the stashed changes:
  ```bash
  git stash apply
  ```

---

## 17. Tagging

Tags mark specific points in a repository’s history as important, such as a release or version.

#### Command:
- To create a tag:
  ```bash
  git tag <tag-name>
  ```
- To push tags to the remote repository:
  ```bash
  git push origin <tag-name>
  ```

---

## 18. Blame

The `git blame` command shows who made the last modification to each line in a file.

#### Command:
```bash
git blame <file>
```

---

## 19. Forking

Forking is a way to create a copy of a repository (typically hosted on GitHub or GitLab) so that you can make changes without affecting the original project. It's often used in open-source collaboration.

---

## 20. Cherry-pick

The `git cherry-pick` command allows you to apply a specific commit from one branch to another branch without merging the entire branch.

#### Command:
```bash
git cherry-pick <commit-hash>
```

---

By understanding and using these concepts, you can effectively collaborate, track changes, and manage your codebase in Git.

---

[<- CS](cs-quick.md)
